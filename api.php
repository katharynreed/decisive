<?php

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Authorization");
  // Initializes curl request with fed in POST url and executes
  $curl = curl_init();

  $curl_request = ''; //string type variable to hold params

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    file_put_contents('php://stderr', print_r("\nYour POST request arguments: \n", TRUE));
    file_put_contents('php://stderr', print_r($_POST, TRUE));
    file_put_contents('php://stderr', print_r('\n\n', TRUE));
    $curl_request = $_POST["target"];
    $post_fields = '';
    foreach ($_POST as $key => $value) {
      if ($key !== "target") {
        $post_fields .= $key . "=" . $value . "&"; //adds request syntax to params
      }
    }

    curl_setopt_array($curl, array(
          CURLOPT_URL => $curl_request . $post_fields,
          CURLOPT_POST => 1
      ));

    curl_exec($curl);

  } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

    foreach (getallheaders() as $name => $value) {
        file_put_contents('php://stderr', print_r($name . " " . $value . "\n", TRUE));
    }
    $curl_request = $_GET["target"];
    $get_fields = '';
    foreach ($_GET as $key => $value) {
      if ($key !== "target") {
        $get_fields .= $key . "=" . $value . "&"; //adds request syntax to params
      }
    }
    file_put_contents('php://stderr', print_r("Here is your GET request: \n", TRUE));
    file_put_contents('php://stderr', print_r($curl_request, TRUE));
    $header = array();
    $header[] = "Authorization: " . getallheaders()["Authorization"];
    curl_setopt_array($curl, array(
          CURLOPT_URL => $curl_request . $get_fields,
          CURLOPT_HTTPHEADER => $header
      ));
    curl_exec($curl);

  }

  // Copy this for debugging
  // file_put_contents('php://stderr', print_r($post_fields, TRUE));

?>
