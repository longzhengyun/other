<?php
//初始化
header("Content-Type:text/html;charset=utf-8");
ini_set("date.timezone", "Asia/Shanghai");

$dir = dirname(dirname(dirname(__FILE__)));
$dir_replace = str_replace("\\", "/", "$dir");

//GBK转码
function detect_encoding($str, $array_encoding){
    foreach ($array_encoding as $value) {
        if($str === iconv($value, $value.'//IGNORE', $str)){
            return $value;
        }
    }
};

function characet($data){
    if(!empty($data)){
        $file_type = detect_encoding($data, array('UTF-8', 'GBK', 'LATIN1', 'BIG5'));
            if( $file_type != 'UTF-8'){
                $data = iconv($file_type, "UTF-8//IGNORE", $data);
            }
        }
    return $data;
};

//获取数据
function get_allfiles($path, &$files){
    //如果是目录
    if(is_dir($path)){
        $dp = dir($path);
        while ($file = $dp -> read()) {
            if($file != "." && $file != ".."){
                get_allfiles($path."/".$file, $files);
            }
        };
        $dp -> close();
    };

    //如果是文件
    if(is_file($path)){
        handler_prototypedata($path, $files);
    };
};

function get_prototypedata($dir){
    $files = array();
    get_allfiles($dir, $files);
    print_r($files);
    return $files;
};

//处理数据
function handler_prototypedata($path, &$files){
    $file_name = basename($path);
    //去掉非html, php文件
    if(strpos($file_name, ".html") || strpos($file_name, ".php")) {
        $arr_title = file($path);

        //输出网页标题
        if($arr_title){
            $arr_title = implode('', $arr_title);
            preg_match_all('/<title>(.*)<\/title>/i', $arr_title, $title);
            $page_title = characet(implode('', $title[1]));//转码
            if(!$page_title){
                $page_title = '无';
            };

            //获取文件修改时间
            $fmt = date("Y-m-d", filemtime($path));

            global $dir_replace;

            $dir_path = str_replace($dir_replace, '', dirname($path).'/');

            //整合数据
            $files[] = array("title" => $page_title, "name" => $file_name, "date" => $fmt, "dir" => $dir_path);
        };
    }
};

//导出数据
$prototypedata = get_prototypedata($dir_replace);

//转json
$json_string = json_encode($prototypedata);

//输出
file_put_contents('prototypedata.json', $json_string);
?>