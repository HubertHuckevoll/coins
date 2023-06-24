<?php

class cPageC
{
  protected array $request = [];
  protected object $view;
  protected ?array $prefs = null;

  /**
   * Summary of __construct
   * @param mixed $view
   * @param mixed $prefs
   * ________________________________________________________________
   */
  public function __construct(array $request, object $view, ?array $prefs = null)
  {
    $this->request = $request;
    $this->view = $view;
    $this->prefs = $prefs;
  }
}

?>
