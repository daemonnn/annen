if($_POST){
 
    if ($_FILES["resim"]["size"]<1024*1024){//Dosya boyutu 1Mb tan az olsun
 
        if ($_FILES["resim"]["type"]=="image/jpeg"){  //dosya tipi jpeg olsun
 
            $aciklama    =     $_POST["aciklama"];
            $dosya_adi   =    $_FILES["resim"]["name"];
 
            //Resimi kayıt ederken yeni bir isim oluşturalım
            $uret=array("as","rt","ty","yu","fg");
            $uzanti=substr($dosya_adi,-4,4);
            $sayi_tut=rand(1,10000);
 
            $yeni_ad="uploadklasoru/".$uret[rand(0,4)].$sayi_tut.$uzanti;
 
            //Dosya yeni adıyla uploadklasorune kaydedilecek
 
            if (move_uploaded_file($_FILES["resim"]["tmp_name"],$yeni_ad)){
                echo 'Dosya başarıyla yüklendi.';
 
                //Bilgileri veritabanına kayıt ediyoruz..
 
$sorgu = $db->prepare("INSERT INTO resimler SET resim=:resim,aciklama=:aciklama");
 
            $sorgu->execute(array(':resim'=> $yeni_ad,':aciklama'=>$aciklama));
 
            if ($sorgu){
                echo 'Veritabanına kaydedildi.';
            }else{
                echo 'Kayıt sırasında hata oluştu!';
            }
        }else{
            echo 'Dosya Yüklenemedi!';
        }
    }else{
        echo 'Dosya yalnızca jpeg formatında olabilir!';
    }
    }else{          
        echo 'Dosya boyutu 1 Mb ı geçemez!';
    }
}
?>