# asterisk-ad-security
## Description:

Additional LADP security project.
The main goal of the project is to provide additional security inside the company using LDAP auth. 
In order to avoid loss passwords and by spy-scam software, additional application for password security was developed. 
Main function is to change LDAP user credentials in certain time for certain user group. 
UI helps administrators to setup cron-like schedule, LDAP and Asterisk configurations.

## Libraries and frameworks
* React.js Flux, LESS.js, React-Router, Reacr-Bootsrap, Superagent;
* Node.js, Express.js, Ldap.js, OpenVOX-sms.js.

## Example of server services config:
```
{
  "ldapConfig": {
    "url": "ldap://localhost:389",
    "baseDN": "DC=domain,DC=local",
    "username": "domain\\username",
    "password": "password",
    "groupDN": "SENDSMS"
  },
  "asteriskConfig": {
    "host": "localhost",
    "port": 5038,
    "username": "admin",
    "password": "admin",
    "span": 1
  },
  "scheduleConfig": {
    "second": 22,
    "minute": null,
    "hour": null,
    "date": null,
    "month": null,
    "year": null,
    "dayOfWeek": null
  }
}
```
## Ask me: s.bulah.ua@gmail.com
