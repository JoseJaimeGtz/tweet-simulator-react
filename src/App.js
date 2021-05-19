import React, { useEffect, useState } from "react";
import { Container, Snackbar } from "@material-ui/core";
import Header from "./components/Header";
import SendTweet from "./components/SendTweet";
import { TWEETS_STORAGE } from "./utils/constants";
import ListTweets from "./components/ListTweets";

function App() {
  // se inicializa el estado del alert
  const [toastProps, setToastProps] = useState({
    open: false,
    text: null,
  });

  // se inicializan los estados de los tweets con arreglos
  const [allTweets, setAllTweets] = useState([]);

  const [reloadTweet, setReloadTweet] = useState(false);

  useEffect(() => {
    // obtiene el storage del tweet
    const allTweetsStorage = localStorage.getItem(TWEETS_STORAGE);
    // parsea la informacion del tweet obtenido
    const allTweetsArray = JSON.parse(allTweetsStorage);
    // cambia el estado de setAllTweets añadiendo todos los arreglos
    setAllTweets(allTweetsArray);
    setReloadTweet(false);
  }, [reloadTweet]);

  const deleteTweets = (index) => {
    allTweets.splice(index, 1);
    setAllTweets(allTweets);
    localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweets));
    setReloadTweet(true);
  }

  return (
    <Container className="tweets-simulator" maxWidth={false}>
      {/*maxWidth false para que sea tod0 el ancho*/}
      {/*setToastProps({ ...toastProps, open: false }) por si hay muchos atributos*/}
      <Header />
      {/*Se pasan todos los Tweets por medio de props y el estado para cambiar el estado del alert*/}
      <SendTweet setToastProps={setToastProps} allTweets={allTweets} />
      <ListTweets allTweets={allTweets} deleteTweets={deleteTweets}/>
      {/*toastProps.text lo obtiene del texto del estado*/}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={toastProps.open}
        autoHideDuration={3000}
        onClose={() => setToastProps({ open: false, text: null })}
        message={<span id="message-id">{toastProps.text}</span>}
      />
    </Container>
  );
}

export default App;
