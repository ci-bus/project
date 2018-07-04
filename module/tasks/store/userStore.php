<?php
	
class User extends Store {
	
    public function __construct($CB, $data = array())
    {
    	//if(!$_SESSION['task_user_id']) die("cb.ctr('tasks','logout')");
    	$data = $CB->minArray($data);
    	$action = $data['action'];
    	if($action)
    	{
    		$this->$action($CB, $data);
    	}
    	else
    	{
    	    $this->load($CB);
    	}
    }
    
    public function load($CB)
    {
        // Get users
        $CB->db->select("id, name, email");
        $CB->db->from("task_user");
        $CB->db->orderBy("task_user.name", "ASC");
        $u_data = $CB->db->get_array();
        
        $CB->db->reset();
        
        if ($u_data)
        {
            $CB->parseStore('user', $u_data);
        }
        else
        {
            echo $CB->db->error();
        }
    }
    
    public function login($CB, $data) {
        
        $CB->db->select("id, name, email");
        $CB->db->from("task_user");
        $CB->db->where("email", $data['email']);
        $CB->db->where("pass", md5($data['pass']));
        $user = $CB->db->get();
        
        if ($user) {
            $CB->parseConfig('user', $user);
        }
    }
}