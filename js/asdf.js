const firebaseConfig = {
    apiKey: "AIzaSyAIotl5Lh4W_Uva3gIy__enl-ffyiQ7Wn0",
    authDomain: "app-de-contactos-56258.firebaseapp.com",
    projectId: "app-de-contactos-56258",
    storageBucket: "app-de-contactos-56258.appspot.com",
    messagingSenderId: "323037615561",
    appId: "1:323037615561:web:c7c42fbff0020d407a0418"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  let nombre = document.getElementById("name");
  let cel = document.getElementById("celphone");
  let save_btn = document.getElementById("save-btn");
  let lista = document.getElementById("lista");
  save_btn.addEventListener("click", () => {
    let data = {
      nombre: nombre.value,
      celular: cel.value,
    };
    save_data_firebase(data);
  });
  
  const save_data_firebase = (d) => {
    db.collection("contactos")
      .add(d)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        get_data_firebase();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  
  let contactos_arr = [];
  
  const get_data_firebase = () => {
    contactos_arr = [];
    db.collection("contactos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          contactos_arr.push(doc.data());
        });
        buildList();
      });
  };
  
  const buildList = () => {
    lista.innerHTML = "";
    contactos_arr.forEach((e) => {
      lista.insertAdjacentHTML(
        "beforeend",
        `
       <li>${e.nombre} - ${e.celular}</li>
      `
      );
    });
  };
  
  get_data_firebase();
