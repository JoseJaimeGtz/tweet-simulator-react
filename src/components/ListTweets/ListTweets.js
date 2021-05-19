import React from "react";
import { Grid } from "@material-ui/core";
import "./ListTweets.scss";
import Tweet from "../Tweet";

export default function ListTweets(props) {
  const { allTweets, deleteTweets } = props;

  if (!allTweets || allTweets.length === 0) {
    console.log("No hay ningun tweet");
    return (
      <div className="list-tweets-empty">
        <h2>No hay ningun tweet</h2>
      </div>
    );
  }

  return (
    <Grid container spacing={3} className="list-tweets">
      {allTweets.map((tweet, index) => (
        <Grid key={index} item xs={4}>
          <Tweet tweet={tweet} index={index} deleteTweets={deleteTweets} />
        </Grid>
      ))}
    </Grid>
  );
}
