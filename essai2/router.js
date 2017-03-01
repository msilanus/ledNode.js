function route(handle, pathname, rep, req) {
  console.log("Début du traitement de l'URL " + pathname + ".");
  if (typeof handle[pathname] === 'function') {
	handle[pathname](rep, req);
  } else {
    console.log("Aucun gestionnaire associé à " + pathname);
	rep.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
    rep.write("404 Non trouvé");
	rep.end();
  }
}

exports.route = route;


