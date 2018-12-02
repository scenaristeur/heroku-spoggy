# Spoggy-solid-gui

A simple gui for Solid made with Polymer3 WebComponents

# Demo
[index-mini.html](https://smag0.solid.community/public/spoggy/gui/index-mini.html)

[SPOGGY](https://smag0.solid.community/public/spoggy/gui/index.html)

# Polymer Element / Webcomponents
 https://github.com/Polymer/polymer

# Install
Just copy the content of the index-mini.html into an index.html file located in the public folder of your POD.

content of index-mini.html
```

<html>
<head>
  <meta charset="utf-8">
  <script type="module" src="https://cdn.jsdelivr.net/gh/scenaristeur/heroku-spoggy/gui/src/my-app.js"></script>
  <!-- Polyfills only needed for Firefox and Edge. -->
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs@next/webcomponents-loader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/rdflib@0.19.1/dist/rdflib.min.js"></script>
  <script src="https://solid.github.io/solid-auth-client/dist/solid-auth-client.bundle.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/jeff-zucker/solid-file-client/solid-file-client.js"></script>
</head>
<body>
  <my-app mood="blip"></my-app>
</body>

<script>
  solid.auth.trackSession(session => {
    if (!session)
    console.log('The user is not logged in')
    else
    console.log(`The user is ${session.webId}`)
  })
</script>



<script>
  console.log("RDFLIB : ",$rdf);
  console.log("SOLID-AUTH : ",solid);

  const fileClient = new SolidFileClient()
  console.log(fileClient)
</script>
</html>

```
