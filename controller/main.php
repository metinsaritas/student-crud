<?php

class Main extends Controller
{
    public function index()
    {
        $this->view("template", ["page" => null]);
    }
}