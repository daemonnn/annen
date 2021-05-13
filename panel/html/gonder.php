<?php 
    print_r($_FILES);
    if($_FILES['dosya']['error'] == 4){
        $msg = 'Lütfen bir dosya seçiniz';
    }else if($_FILES['dosya']['error'] != 0){
        $msg = 'Yüklemeye çalıştığınız dosya da bir hata vardır!';
    }else if(!is_uploaded_file($_FILES['dosya']['tmp_name'])){
        $msg = 'Dosya sisteme yüklenirken bir hata oluştu!';
    }else{
        $gecerli_uzantilar = [
            'image/png',
            'image/jpeg',
            'image/gif'
        ];
        $maksimumBoyut = (1024 * 1024) * 3;
        if(!in_array($_FILES['dosya']['type'],$gecerli_uzantilar)){
            $msg = 'Lütfen geçerli uzantıda bir dosya gönderiniz!';
        }else if($_FILES['dosya']['size'] > $maksimumBoyut){
            $msg = 'Yüklemeye çalıştığınız dosyanın boyutu çok büyük en fazla 3 MB bir dosya yükleyebilirsiniz!';
        }else{
            $upload = move_uploaded_file($_FILES['dosya']['tmp_name'],  $_FILES['dosya']['name']);
            if($upload){
                $msg = 'Dosya yüklendi';
            }else{
                $msg = 'Dosya yüklenemedi';
            }
        }
    }
    echo isset($msg) ?  $msg : "Herhangi bir mesaj yoktur. Dosya yükleme işlemi gerçekleşmedi";
?>