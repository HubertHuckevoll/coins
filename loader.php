<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/coins/logger.php');

/**
 * CBM Auto loader
 * ________________________________________________________________
 */
spl_autoload_register(function($className)
{
  $fname = null;

  $ct = substr($className, -1);

  switch($ct)
  {
    case 'V':
      $fname = $_SERVER['DOCUMENT_ROOT'].'/coins/vw/'.$className.'.php';
    break;

    case 'M':
      $fname = $_SERVER['DOCUMENT_ROOT'].'/coins/md/'.$className.'.php';
    break;

    case 'C':
      $fname = $_SERVER['DOCUMENT_ROOT'].'/coins/ct/'.$className.'.php';
    break;
  }

  if ($fname !== null)
  {
    if (file_exists($fname))
    {
      require_once($fname);
    }
  }
});

?>