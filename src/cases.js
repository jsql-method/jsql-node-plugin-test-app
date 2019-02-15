var cases = {};
var newItemId = 9999;
var hashUrl = "https://test-api.jsql.it/api/request/hashes";
var nodeUrl = "http://localhost:4000/";
var memberKey = "Z6kEovODxAv2I5hKekMyUw==";
var apiKey =
  "==UEXuFlMOJJ89jAEyOEpAM12WNd5MdEkBl0OI09BJMA==kipgSGXIAS4qpE3Br8VW";
var hashHttp = new XMLHttpRequest();

cases["1. delete from public.person where id=" + newItemId] = function(
  callBack
) {
  var start = new Date().getTime();

  var resultCallback = function(status) {
    var end = new Date().getTime();
    var duration = end - start;

    callBack(status, duration);
  };

  var hashResultCallbac = function(hashes) {
    callNodeSever(
      "DELETE",
      "delete",
      hashes,
      { id: newItemId },
      resultCallback
    );
  };

  hashQuery(["delete from public.person where id=:id"], hashResultCallbac);
};

cases["select * from public.person"] = function(callBack) {
  var start = new Date().getTime();
  newItemId += 1;

  var resultCallback = function(status) {
    var end = new Date().getTime();
    var duration = end - start;

    callBack(status, duration);
  };

  var hashResultCallbac = function(hashes) {
    callNodeSever("POST", "select", hashes, {}, resultCallback);
  };

  hashQuery(["select * from public.person"], hashResultCallbac);
};

cases[
  "insert into public.person values (id, age, enabled, name, salary, surname);"
] = function(callBack) {
  var start = new Date().getTime();

  var resultCallback = function(status) {
    var end = new Date().getTime();
    var duration = end - start;

    callBack(status, duration);
  };

  var hashResultCallbac = function(hashes) {
    callNodeSever(
      "POST",
      "insert",
      hashes,
      {
        id: newItemId,
        age: 30,
        enabled: true,
        name: "auto-test",
        salary: 3000,
        surname: "Bravo"
      },
      resultCallback
    );
  };

  hashQuery(
    [
      "insert into public.person values (:id, :age, :enabled, ':name', :salary, ':surname');"
    ],
    hashResultCallbac
  );
};

cases["select * from public.person where id=" + newItemId] = function(
  callBack
) {
  var start = new Date().getTime();

  var resultCallback = function(status) {
    var end = new Date().getTime();
    var duration = end - start;

    callBack(status, duration);
  };

  var hashResultCallbac = function(hashes) {
    callNodeSever("POST", "select", hashes, { id: newItemId }, resultCallback);
  };

  hashQuery(["select * from public.person where id=:id"], hashResultCallbac);
};

cases["2. delete from public.person where id=" + newItemId] = function(
  callBack
) {
  var start = new Date().getTime();

  var resultCallback = function(status) {
    var end = new Date().getTime();
    var duration = end - start;

    callBack(status, duration);
  };

  var hashResultCallbac = function(hashes) {
    callNodeSever(
      "DELETE",
      "delete",
      hashes,
      { id: newItemId },
      resultCallback
    );
  };

  hashQuery(["delete from public.person where id=:id"], hashResultCallbac);
};

callNodeSever = function(httpMethod, methodType, hashes, params, callback) {
  try {
    var nodeHttp = new XMLHttpRequest();
    nodeHttp.open(httpMethod, nodeUrl + methodType, false);
    nodeHttp.setRequestHeader("Content-type", "application/json");
    nodeHttp.onload = function() {
      var data = JSON.parse(this.responseText);
      if (data.length > 0) {
        callback("Rows impact " + data.length);
      } else {
        if (data.status && data.status === "ok") {
          callback("Rows impact 1");
        } else {
          callback("Rows impact 0");
        }
      }
    };
    nodeHttp.send(JSON.stringify({ token: hashes, params: params }));
  } catch (error) {
    console.error(error);
    callback("FAILED");
  }
};

hashQuery = function(sqlQuery, callback) {
  try {
    hashHttp.open("POST", hashUrl, false);
    hashHttp.setRequestHeader("Content-type", "application/json");
    hashHttp.setRequestHeader("memberKey", memberKey);
    hashHttp.setRequestHeader("apiKey", apiKey);
    hashHttp.onload = function() {
      var hashes = [];
      JSON.parse(this.responseText).data.forEach(element => {
        hashes.push(element.token);
      });
      console.log(JSON.stringify(hashes));
      callback(hashes);
    };
    hashHttp.send(JSON.stringify(sqlQuery));
  } catch (error) {
    console.error(error);
    callback("FAILED");
  }
};
