<h1>Function</h1>
<?php
  function printUser() {
    $user  = "User 1";
    $role = "student";
    echo $user."<br/>";
    echo $role."br/>";
  }
  function editUser($value, $age) {
    $user  = "User 1";
    $role = "student";
    echo $user."<br/>";
    echo $role."br/>";
  }

  printUser();
  echo '<br/>';
  editUser("maureen", 50);
?>