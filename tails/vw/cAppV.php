<?php

/**
 * Another attempt at a view.
 * Instead of setting the data from outside and then calling "draw"
 * we have multiple draw functions which are passed the data as parameters.
 * The draw functions render the data (using various render Functions),
 * assign the rendered fragments to the c-tags (setTag) and in the
 * end call the original "draw" function.
 */
class cAppV
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
  protected function draw(): void
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
      $str = $this->data[$tagName] ?? '';

      $this->htmlTemplate = str_replace($tag, $str, $this->htmlTemplate);
    }

    echo $this->htmlTemplate;
  }

  /**
   * set data key
   * _________________________________________________________________
   */
  protected function setTag(string $key, string $val): void
  {
    $this->data[$key] = $val;
  }
}

?>