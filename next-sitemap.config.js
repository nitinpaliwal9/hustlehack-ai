/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yourdomain.com', // <-- change to your real domain
  generateRobotsTxt: true,
  exclude: ['/dashboard', '/complete-profile'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/dashboard', '/complete-profile'] },
    ],
  },
}; 