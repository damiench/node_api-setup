import * as bcrypt from 'bcrypt-nodejs';

export const hashString = (string): Promise<string> => {
  return new Promise((resolve, reject) => {
      bcrypt.hash(string, null, null, (err, hash) => {
          if (err)
              return reject(err);

          resolve(hash);
      })
  });
};