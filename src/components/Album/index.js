function Album() {
  return (
    <div key={index}>
      <p>
        {albumTitle}
      </p>

      <ul>
        {albuns[albumTitle].map((track, index2) => <li key={index2}>{track.title}</li>)}
      </ul>
    </div>
  );
}