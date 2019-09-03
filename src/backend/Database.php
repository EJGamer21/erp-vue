<?php

class Database {
    private $connection;
    private $_fields = [];
    private $_conditions = [];
    
    function __construct() {
        include 'db-config.php';

        $this->connection = new mysqli(
            $config['host'],
            $config['user'],
            $config['pass'],
            $config['dbname'],
            $config['port']
        );
        if ($this->connection->connect_error) {
            throw new Exception(
                "Error: ". $this->connection->connect_error,
                $this->connection->connect_errno
            );
        }
    }

    protected function get($id = NULL, $fields = [], $conditions = []) {
        $this->_fields = implode(',', $fields);

        /*
        [
            ['name = Pepe'],
            ['lastname != Agallas']
        ]
         */
        $conditions_array = [];
        for ($i = 0; $i < $conditions.sizeof; $i++) {
            array_push($conditions_array, $conditions[$i]);
        }
        $this->_conditions = $conditions_array;
        
        if ($this->_conditions) {
            return $this->_getWhere();
        }
        
        else {
            if (!$id) {
                return $this->_getAll();
            }

            elseif ($id) {
                return $this->_getById($id);
            }

            else {
                return FALSE;
            }
        }
    }

    protected function set($data) {
        $fields = [];
        $values = [];
        foreach ($data as $field => $value) {
            array_push($fields, $field);
            array_push($values, $value);
        }
        // Insert new record
        if (isset($field['id'])) {
            try {
                $this->startTransaction();
                $sql = $this->execQuery("INSERT INTO {$this->_tablename} VALUES ({$field})");

                if ($sql) {
                    $this->commit();
                    return $this->connection->insert_id;
                } else {
                    throw new Exception('Error inserting record in: '.$this->_tablename.'.');
                }
            } catch (Exception $e) {
                $this->rollback();
                return $e->getMessage();
            }
        } 
        
        // Update existing record
        else {
            try {
                $this->startTransaction();
                $sql = $this->execQuery("UPDATE {$this->_tablename} SET {$field}");
                if ($sql) {
                    $this->commit();
                } else {
                    throw new Exception('Error updating record in: '.$this->_tablename.'.');
                }
            } catch (Exception $e) {
                $this->rollback();
                return $e->getMessage();
            }
        }
    }

    private function _getAll() {
        if (empty($this->_fields)) {
            $sql = $this->_get();
        } else {
            $sql = $this->execQuery("SELECT {$this->_fields} FROM {$this->_tablename}");
        }
        return $sql->fetch_assoc();
    }

    private function _getById($id) {
        if(empty($this->_fields)) {
            $sql = $this->_get();
        } else {
            $sql = $this->execQuery("SELECT {$this->_fields} FROM {$this->_tablename} WHERE 'id' = {$id}");
        }

        return $sql->fetch_assoc();
    }

    private function _getWhere() {
        if (empty($this->_fields)) {
            $sql = $this->_get();
        } else {
            $sql = $this->execQuery("SELECT {$this->_tablename}.id, {$this->_fields} FROM {$this->_tablename} WHERE {$this->_conditions}");
        }

        return $sql->fetch_assoc();
    }
    
    private function startTransaction() {
        return $this->execQuery('START TRANSACTION');
    }

    private function _get() {
        return $this->execQuery("SELECT * FROM {$this->_tablename}");
    }

    private function commit() {
        return $this->execQuery('COMMIT');
    }

    private function rollback() {
        return $this->execQuery('ROLLBACK');
    }

    private function execQuery($sql) {
        $execution = $this->connection->query($sql);
        if (!$execution) {
            throw new Exception('Error: Cannot execute query');
        }
        
        return $execution;
    }
}

