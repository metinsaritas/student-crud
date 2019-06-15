<?php

class Model
{
    public function getAll($sql = null)
    {
        $tableName = get_class($this);
        if ($sql == null) $sql = "SELECT * FROM {$tableName}";

        $bean = strtolower($tableName);
        $data = [
            "total" => 0,
            "data" => []
        ];

        $data["data"] = R::getAll($sql);
        $total = $data["total"] = count($data["data"]);

        if ($total <= 0)
            return $data;

        return $data;
    }

    public function getPaged($page = 1, $sql = null)
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

        if ($sql == null) $sql = "SELECT * FROM {$tableName} LIMIT $next, $limit";
        $data["data"] = R::getAll($sql);
       
        return $data;
    }

    public function get ($id, $sql = null) {
        $tableName = get_class($this);
        $bean = strtolower($tableName);

        if ($sql == null) $sql = "SELECT * FROM {$tableName} WHERE id = $id";
        return R::getAll($sql);
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