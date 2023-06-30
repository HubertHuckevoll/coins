<?php

class cPageC
{
  protected array $request = [];
  protected object $view; // optional - in case you want to have a hook-specific views
  protected ?array $prefs = null;

  /**
   * Summary of __construct
   * @param mixed $request
   * @param mixed $prefs
   * @param mixed $view
   * ________________________________________________________________
   */
  public function __construct(array $request, ?array $prefs = null, ?object $view = null)
  {
    $this->request = $request;
    $this->prefs = $prefs;
    $this->view = $view;
  }
}

?>
