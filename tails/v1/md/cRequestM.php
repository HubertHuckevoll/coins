<?php

/**
 * give us request data
 * __________________________________________________________________
 */
class cRequestM
{

  public $pathInfoAssignCallback = null;

  /**
   * Summary of __construct
   * @param callable $pathInfoAssignCallback
   * ________________________________________________________________
   */
  public function __construct(?callable $pathInfoAssignCallback = null)
  {
    $this->pathInfoAssignCallback = $pathInfoAssignCallback;
  }

  /**
   * get
   * ________________________________________________________________
   */
  public function get(): array
  {
    $reqs = [];
    $reqs = $_GET + $_POST + $this->pathInfoAssign();

    foreach($reqs as &$req)
    {
      $req = trim($req);
      $req = preg_replace("/^(content-type:|bcc:|cc:|to:|from:)/im", "", $req);
    }

    $reqs += $this->getJsonInput();

    return $reqs;
  }

  /**
   * get path infos
   * ________________________________________________________________
   */
  protected function pathInfoAssign(): array
  {
    $keyVal = [];
    $segments = [];
    $pathInfo = '';

    if ($this->pathInfoAssignCallback !== null)
    {
      if (isset($_SERVER['PATH_INFO']))
      {
        $pathInfo = $_SERVER['PATH_INFO'];
        $pathInfo = substr($pathInfo, 1); // PATH_INFO has a leading "/" that creates a fake first entry
        $segments = explode('/', $pathInfo);

        $keyVal = ($this->pathInfoAssignCallback)($segments);
      }
    }

    return $keyVal;
  }

  /**
   * Summary of getJsonInput
   * @return array
   * ________________________________________________________________
   */
  protected function getJsonInput(): array
  {
    $input = [];
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    return $input;
  }
}

?>
