<?php

namespace App\Controllers;
use App\Core\Form;

class WelcomeController
{
    public function index()
    {
        echo app()->render("index");
    }
}

