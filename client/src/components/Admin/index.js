const AdminBro = require('admin-bro');

const adminBro = new AdminBro({
   rootPath: '/admin',
   loginPath: '/admin/login',
   resources: [User, Company],
});
module.exports = adminBro;