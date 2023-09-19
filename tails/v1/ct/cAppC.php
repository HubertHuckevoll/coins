<?php

class cAppC
{
  protected ?string $mainControllerName = null;
  protected ?string $mainMethodName = null;
  protected $pathInfoAssignCallback = null;
  protected ?array $prefs = null;

  /**
   * Konstruktor
   * ________________________________________________________________
   */
  public function __construct(string $mainControllerName, string $mainMethodName, ?callable $pathInfoAssignCallback = null, ?array $prefs = null)
  {
    $this->mainControllerName = $mainControllerName;
    $this->mainMethodName = $mainMethodName;

    $this->pathInfoAssignCallback = $pathInfoAssignCallback;
    $this->prefs = $prefs;
  }

  /**
   * run with a path pattern of index.php/mod/hook?queryparams=xyz
   * ________________________________________________________________
   */
  public function run(): void
  {
    $modName = '';
    $methodName = '';
    $rm = new cRequestM($this->pathInfoAssignCallback);

    $request = $rm->get();

    if (isset($request['mod']) && isset($request['hook']))
    {
      $modName = $request['mod'];
      $methodName = $request['hook'];
    }
    else
    {
      $modName = $this->mainControllerName;
      $methodName = $this->mainMethodName;
    }

    $this->exec($request, $modName, $methodName);
  }

  /**
   * call the controller
   * ________________________________________________________________
   */
  protected function exec(array $request, string $modName, string $methodName): void
  {
    $controllerObj = null;
    $controllerObj = new $modName($request, $this->prefs);

    if ((isset($controllerObj) && method_exists($controllerObj, $methodName)))
    {
      call_user_func(array($controllerObj, $methodName));
    }
    else
    {
      throw new Exception('Unknown message.');
    }
  }

  /**
   * redirect if everything fails
   * __________________________________________________________________
   */
  function redirect()
  {
    $prot = ($_SERVER['SERVER_PORT'] == 443) ? 'https://' : 'http://';

    $href = '';
    $href = dirname($_SERVER['PHP_SELF']);
    $href = substr($href, 0, strrpos($href, 'index.php'));
    $href = rtrim($href, '/\\');
    $href = $prot.$_SERVER['HTTP_HOST'].$href.'/index.php/'.$this->mainControllerName.'/'.$this->mainMethodName;

    header('Location: '.$href);
  }

}

?>