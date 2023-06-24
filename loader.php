<?php

/**
 * Coins Auto loader
 * ________________________________________________________________
 */
spl_autoload_register(function($className)
{
  $fname = null;

  $baseFolder = $_SERVER['DOCUMENT_ROOT'].'/coins/tails/';
  $ct = substr($className, -1);

  switch($ct)
  {
    case 'V':
      $fname = $baseFolder.'vw/'.$className.'.php';
    break;

    case 'M':
      $fname = $baseFolder.'md/'.$className.'.php';
    break;

    case 'C':
      $fname = $baseFolder.'ct/'.$className.'.php';
    break;

    default:
      $fname = $baseFolder.'lb/'.$className.'.php';
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