import db from './db';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const createUser = (username: string, email: string, password: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`);
    
    stmt.run([username, email, password], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
    
    stmt.finalize();
  });
};

export const getUserByUsername = (username: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as User || null);
        }
      }
    );
  });
};

export const getUserByEmail = (email: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as User || null);
        }
      }
    );
  });
};

export const getUserById = (id: number): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE id = ?",
      [id],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as User || null);
        }
      }
    );
  });
};