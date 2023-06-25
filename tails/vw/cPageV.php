<?php

class cPageV
{
  protected array $data = [];
  protected string $templName = '';
  protected string $htmlTemplate = '';
  protected string $localViewFolder = '/vw/htmlt/';

  /**
   * Konstruktor
   * _________________________________________________________________
   */
  public function __construct(string $templName)
  {
    $this->templName = $templName;
    $this->htmlTemplate = $this->getTemplate();
  }

  /**
   * Summary of getTemplate
   * @throws \Exception
   * @return bool|string
   * ________________________________________________________________
   */
  public function getTemplate(): bool|string
  {
    $fname = dirname($_SERVER['SCRIPT_FILENAME']).$this->localViewFolder.$this->templName.'.htmlt';

    $fc = file_get_contents($fname);

    if ($fc !== false)
    {
      return $fc;
    }
    else
    {
      throw new Exception('Can\'t read file "'.$fname.'"');
    }
  }

  /**
   * replace cbm tags
   * ________________________________________________________________
   */
  public function draw(): void
  {
    $tag = '';
    $tagName = '';
    $str = '';
    $matches = [];
    $re = '/<(c)-(.*)>/iuUs';

    preg_match_all($re, $this->htmlTemplate, $matches, PREG_SET_ORDER, 0);

    foreach($matches as $match)
    {
      $tag = $match[0]; // <c-nav>
      $prefix = $match[1]; // c
      $tagName = $match[2]; // nav
      $func = $prefix.ucfirst($tagName);
      $str = $this->exec($func);

      $this->htmlTemplate = str_replace($tag, $str, $this->htmlTemplate);
    }

    echo $this->htmlTemplate;
  }

  /**
   * set data key
   * _________________________________________________________________
   */
  public function set(string $key1, mixed $key2orVal, mixed $val = null): void
  {
    if (isset($val))
    {
      $this->data[$key1][$key2orVal] = $val;
    }
    else
    {
      $this->data[$key1] = $key2orVal;
    }
  }

  /**
   * does key/val pair exist?
   * ________________________________________________________________
   */
  public function is(string $key, mixed $key2 = null): bool
  {
    if (isset($key2))
    {
      return isset($this->data[$key][$key2]) ? true : false;
    }
    else
    {
      return isset($this->data[$key]) ? true : false;
    }
  }

  /**
   * get data for key
   * _________________________________________________________________
   */
  public function get(string $key, mixed $key2 = null): mixed
  {
    if (isset($key2))
    {
      return $this->data[$key][$key2] ?? null;
    }
    else
    {
      return $this->data[$key] ?? null;
    }
  }

  /**
   * get data key
   * _________________________________________________________________
   */
  public function getAll(): array
  {
    return $this->data;
  }

  /**
   * reset data
   * _________________________________________________________________
   */
  public function reset(): void
  {
    $this->data = [];
  }

  /**
   * execute a draw function dynamically
   * _________________________________________________________________
   */
  public function exec(string $method): string
  {
    $str = '';
    if (method_exists($this, $method))
    {
      $str = $this->$method();
    }
    return $str;
  }
}

?>