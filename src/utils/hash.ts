import * as bcrypt from 'bcrypt-nodejs';

export const hashString = (string: string): Promise<string | Error> => {
  return new Promise((resolve, reject) => {
      bcrypt.hash(string, null, null, (err, hash) => {
          if (err)
              return reject(err);

          resolve(hash);
      })
  });
};

export const compareWithHash = (hash: string, string: string): Promise<boolean | Error> => {
    return new Promise((resolve, reject) => {
       bcrypt.compare(string, hash, (err, res) => {
           if (err)
               resolve(false);

           resolve(res);
       });
    });
};
