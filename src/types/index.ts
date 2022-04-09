type Account = {
  _id: string;
  email: string;
  password: string;
  userAgent: string;
};

type BrowserOptions = {
  headless: boolean;
  account: Account;
};

type issuu = {
  judul: string;
  deskripsi: string;
  pdf: string;
}

export {
  Account,
  BrowserOptions,
  issuu
}