<?php

class Model
{
    public function getAll()
    {
        $tableName = get_class($this);
        return R::getAll("SELECT * FROM {$tableName}");
    }

    public function getPaged($page = 1)
    {
        if ($page <= 0) {
            $page = 1;
        }

        $tableName = get_class($this);
        $limit = 5;
        $next = ($page - 1) * $limit;
        $bean = strtolower($tableName);
        $total = R::count($bean);
        $data = [
            "total" => $total,
            "data" => []
        ];

        if ($total <= 0)
            return $data;

        $data["data"] = R::getAll("SELECT * FROM {$tableName} LIMIT $next, $limit");           
       
        return $data;
    }

    public function get ($id) {
        $tableName = get_class($this);
        $bean = strtolower($tableName);
        return R::findOne($bean, "id = $id");
    }

    public function retrieve ($id) {
        $tableName = get_class($this);
        $bean = strtolower($tableName);
        return R::load($bean, $id);
    }

    public function isset ($arr, $key, $default) {
        return isset($arr[$key]) ? $arr[$key] : $default;
    }
}