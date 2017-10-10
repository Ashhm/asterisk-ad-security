import generatePassword from 'password-generator';

const uppercaseMinCount = 1;
const lowercaseMinCount = 1;
const numberMinCount = 1;
const UPPERCASE_RE = /([A-Z])/g;
const LOWERCASE_RE = /([a-z])/g;
const NUMBER_RE = /([\d])/g;

function isStrongEnough(password) {
  const uc = password.match(UPPERCASE_RE) || '';
  const lc = password.match(LOWERCASE_RE)|| '';
  const n = password.match(NUMBER_RE) || '';
  return uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount;
}

const pwdGenerator = () => {
  let password = '';
  while (!isStrongEnough(password)) {
    password = generatePassword(8, false, /([A-Za-z0-9])/);
  }
  return password;
};


export default pwdGenerator;