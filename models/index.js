const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});


// const Page = db.define('page', {
// 	title: Sequelize.STRING,
// 	urlTitle: Sequelize.STRING, 
// 	content: Sequelize.STRING,
// 	status: Sequelize.STRING
// });

// const User = db.define('user', {
// 	name: Sequelize.STRING, 
// 	email: Sequelize.STRING
// });

// db.sync()
// .then(() => {
// 	return Page.findById(1);
// });
function urlMaker(title){
	if (!title){
		return Math.random().toString(36).substring(2, 15);
	}
	return title.replace(/\s+/g, '_').replace(/\W/g, '');
} 

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING, 
        allowNull: false,
    },
    urlTitle: {
        type: Sequelize.STRING, 
        allowNull: true,
        // defaultValue: 'string'
        // get() {
        // 	const title = this.getDataValue('title')
        // 	return this.getDataValue('/' + title + '/')
        // }
    },
    content: {
        type: Sequelize.TEXT, 
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }, 
    date : {
    	type: Sequelize.DATE, 
    	defaultValue: Sequelize.NOW
    }
});

Page.hook('beforeValidate', (page, options) =>{
    page.dataValues.urlTitle = urlMaker(page.dataValues.title);
})
const User = db.define('user', {
    name: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    email: {
        type: Sequelize.STRING, 
        allowNull: false,
        validate: {
        	isEmail: true
        }
    }
});


module.exports = {
  Page: Page,
  User: User,
  db:db
};






