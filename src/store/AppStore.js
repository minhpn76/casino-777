import { observable, action, makeObservable } from "mobx";
import { persistence, StorageAdapter, isPersistence } from "mobx-persist-store";

import { readStore, writeStore } from "../common/helpers";
import { nanoid } from "nanoid";

class AppStore {
  users = [];
  username = null;
  score = null;
  history = [];

  constructor() {
    makeObservable(this, {
      users: observable.deep,
      username: observable,
      score: observable,
      history: observable,
      login: action,
      createUserAndLogin: action,
      spin: action
    });
  }

  getUserIndex = (name) => {
    return this.users.findIndex((user) => user.username === name);
  };

  createUserAndLogin = (name) => {
    const newUser = {
      username: name,
      score: 99.99,
      history: []
    };

    this.users.push(newUser);

    this.username = newUser.username;
    this.score = newUser.score;
    this.history = newUser.history;
  };

  login = async (name) => {
    const foundUserIndex = this.getUserIndex(name);

    if (foundUserIndex !== -1) {
      const { username, score, history } = await this.users[foundUserIndex];

      this.username = username;
      this.score = score;
      this.history = history;

      return;
    }

    this.createUserAndLogin(name);
  };

  logout = async () => {
    this.username = null;
    this.score = null;
    this.history = [];
  };

  updateUser = (name) => {
    const foundUserIndex = this.getUserIndex(name);

    this.users[foundUserIndex] = {
      username: this.username,
      score: this.score,
      history: this.history
    };
  };

  updateHistory = (slots) => {
    const draw = {
      id: nanoid(),
      slots: slots.join(" "),
      time: new Date().toLocaleTimeString()
    };

    this.history.push(draw);
  };

  spin = async ({ amount, slots }) => {
    // spin fee
    this.score -= 1;

    this.score = (this.score + amount).toFixed(2);

    await this.updateHistory(slots);

    // update user in users array
    this.updateUser(this.username);
  };
}

export const appStore = persistence({
  name: "AppStore",
  properties: ["users", "username", "score", "history"],
  adapter: new StorageAdapter({
    read: readStore,
    write: writeStore
  })
})(new AppStore());
