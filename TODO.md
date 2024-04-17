# Social network

Questa app sarà disponibile via web per desktop e cellulare. La dashboard avrà principalmente il feed con i post.

## Interfaccia

### desktop version

Nella modalità desktop avrò a sinistra una sidebar con i seguenti link:

- Feed
- Explore
- Profile

Nel resto dell'interfaccia avrò la searchbar, il pulsante add post, e il feed. Il feed avrà post con una griglia simile a quella di pinterest. Per caricare altri post ci sarà un pulsante carica altri.

### mobile version

Nella mobile version ci sarà soltanto il feed, e la sidebar collasserà e diventerà un menu che si può mostrare e nascondere schiacciando l'apposito tasto in alto a sinistra.

## struttura del database

Il database sarà creato in questo modo. Ogni utente ha nome, cognome, mail, bio. Ogni utente ha anche un numero di following e followers. A ogni utente sono collegati dei post. I post hanno immagine, descrizione. Ogni utente può scrivere uno o più commenti. Ogni utente può mettere un solo like per ogni post.

Una possibile soluzione per la creazione di una tabella di likes è la seguente (soluzione ChatGPT)

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definisci lo schema per la collezione "likes"
const likeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
});

// Crea un indice univoco sulla coppia userId e postId
likeSchema.index({ userId: 1, postId: 1 }, { unique: true });

// Crea il modello per la collezione "likes"
const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
```

Un'altra soluzione per creare l'intero database è la seguente:

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema per gli utenti
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  bio: String,
  following: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

// Schema per i post
const PostSchema = new Schema({
  image: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
});

// Schema per i commenti
const CommentSchema = new Schema({
  text: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

// Modello per gli utenti
const User = mongoose.model("User", UserSchema);

// Modello per i post
const Post = mongoose.model("Post", PostSchema);

// Modello per i commenti
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { User, Post, Comment };
```
