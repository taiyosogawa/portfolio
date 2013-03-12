<?php
	function callJS($js)
		{
		    echo '<script type="text/javascript">' . $js . '</script>';
		}
	function died($error_message)
		{
		    callJS("$('#field-missing-message').append('" . $error_message . "');");
		}

	$error_flag = isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']);
	$email_to = "taiyosogawa@gmail.com";
	$email_subject = "Message from portfolio";

	if($error_flag) {
		$name = $_POST['name']; // required
	    $email_from = $_POST['email']; // required
	    $message = $_POST['message']; // required
	}
	callJS("parent.top.$('#loading-gif').hide();");
?>

<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css" media="screen" />
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="css/portfolio.css" media="screen" />
    <style type="text/css">
    </style>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
</head>

<body>
	<div id="main-div">
		<div id="form-div">
			<form class="horizontal" method="post" action="#">
				<fieldset>
					<legend>contact me</legend>
						<div id="field-missing-message"></div>
						<div class="control-group">
							<label class="control-label" for="inputName">name</label>
						    <div class="controls controls-row">
						    	<input type="text" id="inputName" name="name" <?php 
						    		if ($error_flag) {
						    			echo 'value="' . $name . '"';
						    		}
						    	?>>
						    </div>
						</div>
						<div class="control-group">
						   	<label class="control-label" for="inputEmail">email</label>
						    <div class="controls controls-row">
						    	<input class="span3" type="text" id="inputEmail" placeholder="name@domain" name="email" <?php 
						    		if ($error_flag) {
						    			echo 'value="' . $email_from . '"';
						    		}
						    	?>>
						    </div>
					  	</div>
					<div class="control-group">
						<label class="control-label" for="inputMessage">message</label>
						<div class="controls controls-row">
							<textarea id="inputMessage" class="span5" rows="8" cols="100" name="message"><?php if ($error_flag) { echo $message;} ?></textarea>
						</div>
					</div>
					<button id="submit-button" type="submit" class="btn btn-primary">Submit</button>
				</fieldset>
			</form>
		</div>
		<?php
		
		if($error_flag) {
		     
		    $error_flag = FALSE;
		    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
			  if(!preg_match($email_exp,$email_from) || (strcmp("name@domain", $email_from) == 0)) {
			    $error_flag = TRUE;
			  }
			    $string_exp = "/^[A-Za-z .'-]+$/";
			  if(!preg_match($string_exp,$name)) {
			    $error_flag = TRUE;
			  }

			  if(strlen($message) < 2) {
			    $error_flag = TRUE;
			  }
			  if($error_flag) {
			    died("Please make sure all fields are filled correctly.");
			  } else {
			  	callJS("$('#form-div').hide()");
			  	echo '<img id="loading-img" src="img/ajax-loader.gif">';
			    $email_message = "Form details below.\n\n";
			     
			    function clean_string($string) {
			      $bad = array("content-type","bcc:","to:","cc:","href");
			      return str_replace($bad,"",$string);
			    }
			     
			    $email_message .= "Name: ".clean_string($name). "\n";
			    $email_message .= "Email: ".clean_string($email_from)."\n";
			    $email_message .= "Message: ".clean_string($message)."\n";
			     
			     
				// create email headers
				$headers = 'From: '.$email_from."\r\n".
				'Reply-To: '.$email_from."\r\n" .
				'X-Mailer: PHP/' . phpversion();
				if(mail($email_to, $email_subject, $email_message, $headers)){
				  callJS("$('#loading-img').hide();");
				  echo '<div id="success-message">Your message has been sent.<br />Thank you.</div>';
				}
			}

		}

		?>
	</div>



</body>
</html>
