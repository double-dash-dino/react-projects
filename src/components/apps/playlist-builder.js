import React, { useState } from "react";
import "./playlist-builder.css";

const PlaylistBuilder = (props) => {
  return (
    <div>
      <div className="form-card">
        Playlist builder
        <form action="POST">
          <input type="text" id="playlistName"></input>
          <input type="submit" value="submit"></input>
        </form>
      </div>
      <div>Playlist result</div>
    </div>
  );
};

export default PlaylistBuilder;
