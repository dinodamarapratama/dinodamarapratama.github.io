function hitung_bmr() {

    var tingkatAktivitas = '';
 
    console.log($("#tingkatAktivitas input[type=radio]").length);

    
            var tingkatAktivitas = $('#tingkatAktivitas input:radio:checked').val(); //nilai tingkat aktivitas
    
    console.log($('#tingkatAktivitas input:radio:checked').val());
    if ($('#tinggi').val() == 0) {
        alert("Mohon masukkan tinggi anda");
        return false;
    } else {
        var tinggi = $('#tinggi').val(); //tinggi
		 console.log(tinggi);
    }

    if ($('#berat').val()  == 0) {
        alert("Mohon masukkan berat anda");
        return false;
    } else {
        var berat = $('#berat').val() ; //berat
		console.log(berat);
    }

    if (($('#umur').val() == 0) || ($('#umur').val() == '')) {
        alert("Mohon masukkan umur anda");
        return false;
    } else {
        var umur = $('#umur').val(); //umur
		console.log(umur);
    }

    if (tingkatAktivitas == '') {
        alert("Mohon pilih salah satu tingkat akitivitas");
        return false;
    }

    var jenis_kelamin = $('#jenis_kelamin').val();
    console.log(jenis_kelamin);
	
    var unittype = 'metric';

    // Menghitung AMB atau BMR dengan Rumus Harris Benedict (1919)

    if (jenis_kelamin == 'perempuan') { //Rumus Benedict

        bmr = 655 + (9.6 * (berat)) + (1.8 * (tinggi)) - (4.7 * (umur)); //hasil kebutuhan Kalori tanpa akitivitas
    }
    if (jenis_kelamin == 'laki_laki') { //Rumus Benedict

        bmr = 66 + (13.7 * (berat)) + (5 * (tinggi)) - (6.8 * (umur)); //hasil kebutuhan Kalori tanpa akitivitas

        if (tingkatAktivitas == '1.55') {
            tingkatAktivitas = '1.65';
        }
        if (tingkatAktivitas == '1.7') {
            tingkatAktivitas = '1.76';
        }
        if (tingkatAktivitas == '2') {
            tingkatAktivitas = '2.10';
        }
    }



    var kebutuhan_kalori = (bmr * tingkatAktivitas); //kebutuhan Kalori dengan aktivitas fisik 

    num1 = Math.pow(10, 0);
	bmr = Math.round(bmr * num1) / num1;
    bmr_kj = Math.round(bmr * 4.1868); //kebutuhan kalori tanpa akitivitas dalam kilojoule
    
    kebutuhan_kalori = Math.round(kebutuhan_kalori * num1) / num1;
    kebutuhan_kalori_kj = Math.round(kebutuhan_kalori * 4.1868); //kebutuhan kalori dengan aktivitas dalam kilojoule
    document.getElementById("kalori").innerHTML = kebutuhan_kalori; //input value 
    
	
    



    //menghitung AMB dengan IMT
    tinggi_IMT = tinggi / 100 //ubah cm ke m
    var imt = ((berat) / (tinggi_IMT * tinggi_IMT)); //berat dibagi tinggi m2
    var result = ""; //hasil
    if (imt < 17) {
        result = "Anda kekurangan berat badan tingkat berat";
    } else if (imt >= 17 && imt <= 18.5) {
        result = "Anda kekurangan berat badan tingkat ringan";
    } else if (imt > 18.5 && imt <= 25) {
        result = "Berat badan anda normal";
    } else if (imt > 25 && imt <= 27) {
        result = "Anda kelebihan berat badan tingkat ringan";
    } else if (imt > 27) {
        result = "Anda kelebihan berat badan tingkat berat";
    }
    
	imt = imt.toFixed(2);

    var IMT_target = Math.round((tinggi_IMT * tinggi_IMT) * 19); //target ideal

    var kebutuhan_AMB = '';

    if (jenis_kelamin == 'laki_laki') {
        kebutuhan_AMB = 1 * IMT_target * 24;
    }
    if (jenis_kelamin == 'perempuan') {
        kebutuhan_AMB = 0.95 * IMT_target * 24;
    }

    //  * aktivitas fisik
    var IMT_kalori = '';

    if (imt < 18.5) {
        IMT_kalori = (tingkatAktivitas * kebutuhan_AMB) + 500; //hasil
    }
    if (imt > 25) {
        IMT_kalori = (tingkatAktivitas * kebutuhan_AMB) - 500; //hasil
    }
    if (imt > 18.5 && imt <= 25) {
        IMT_kalori = 0;
    }

    document.getElementById("kaloriIMT").innerHTML = Math.round(IMT_kalori);


    //hasil AMB dengan benedict 
    v_summary = "Nilai AMB atau BMR anda adalah:<br><div style='font-size:45px; font-berat:bold; margin:10px 0px 15px 0px;'>" + bmr + "</div>Kebutuhan energi atau kalori anda adalah <b>" + bmr + "</b> kkal (" + bmr_kj + " kilojoules) perhari, tanpa aktivitas.";
    v_summary += "<br><br><b>Kebutuhan kalori harian anda berdasarkan dengan tingkat aktivitas anda adalah " + kebutuhan_kalori + " kkal (" + kebutuhan_kalori_kj + " kilojoules)</b>.";
    v_summary += "<br><br>" + result + " untuk mencapai berat badan ideal dibutuhkan kalori sebanyak : " + Math.round(IMT_kalori) + " kkal perhari";

    result_bmr.innerHTML = "<span>" + v_summary + "</span>";

    var activeResults = document.getElementById("calcresults");
    activeResults.style.display = "block";
    activeResults.style.display = (activeResults.style.display != 'none') ? 'visible' : '';
    // This function is located in the /scripts/jquery.scrollTo-min.js file - (script needs to be in the top of the calculator pumur)
    
  $.scrollTo("#calcresults",800);
}