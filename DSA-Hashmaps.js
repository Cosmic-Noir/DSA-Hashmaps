class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error("Key error");
    }
    return this._hashTable[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    //Find the slot where this key should be in
    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this.length++;
    }
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    };
  }

  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error("Key error");
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //Bitwise left shift with 5 0s - this would be similar to
      //hash*31, 31 being the decent prime number
      //but bit shifting is a faster way to do this
      //tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //converting hash to a 32 bit integer
      hash = hash & hash;
    }
    //making sure hash is unsigned - meaning non-negtive number.
    return hash >>> 0;
  }
}

const main = () => {
  const lotr = new HashMap();
  lotr.MAX_LOAD_RATIO = 0.5;
  lotr.SIZE_RATIO = 3;
  lotr.set("Hobbit", "Bilbo");
  lotr.set("Hobbit", "Frodo");
  lotr.set("Wizard", "Gandolf");
  lotr.set("Human", "Aragon");
  lotr.set("Elf", "Legolas");
  lotr.set("Maiar", "The Necromancer");
  lotr.set("Maiar", "Sauron");
  lotr.set("RingBearer", "Gollum");
  lotr.set("LadyOfLight", "Galadriel");
  lotr.set("HalfElven", "Arwen");
  lotr.set("Ent", "Treebeard");
  //   console.log(lotr);
  //   console.log(lotr.get("Maiar"));
  //   console.log(lotr.get("Hobbit"));
  console.log(lotr._capacity);
};

// main();

// Discrepency because the key was duplicated and the value overwritten.

// The capacity is 8. Because there were 8 non-duplicated key-value pairs.

// What Does this Do

const WhatDoesThisDo = function() {
  let str1 = "Hello World.";
  let str2 = "Hello World.";
  let map1 = new HashMap();
  map1.set(str1, 10);
  map1.set(str2, 20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3, 20);
  map2.set(str4, 10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
};

// To me this looks like it just creates two duplicate hashMaps.

// WhatDoesThisDo();

// Remove Duplicates

const remove = string => {
  const letters = {};
  let myString = "";
  for (let i = 0; i < string.length; i++) {
    // console.log(string[i]);
    if (letters[string[i]] === undefined) {
      letters[string[i]] = true;
      myString += string[i];
    }
  }
  return myString;
};

// console.log(remove("tttkkkllliii"));

// Palindrome
const any = string => {
  const permutations = [];

  function anagram(string) {
    if (string.length === 1) {
      // base case
      return string;
    } else {
      for (let i = 0; i < string.length; i++) {
        const word = string.substring(0, i) + string.substring(i + 1);
        const results = anagram(word);
        for (let j = 0; j < results.length; j++) {
          permutations.push(string[i] + results[j]);
        }
      }
    }
  }

  for (let perm in permutations) {
    for (let i = 0; i < perm.length / 2; i++) {
      if (s[i] !== s.charAt(s.length - 1 - i)) {
        return false;
      } else {
        return true;
      }
    }
  }
};

console.log(any("east"));

// Anagram grouping
const group = array => {
  let hash = {};

  array.forEach(string => {
    let letters = string.split("").sort();
    hash[letters] ? hash[letters].push(string) : (hash[letters] = [string]);
  });

  const keys = Object.keys(hash);

  const values = keys.map(function(v) {
    return hash[v];
  });
  return values;
};

let strs = ["eat", "tea", "tan", "ate", "nat", "bat"];

console.log(group(strs));
