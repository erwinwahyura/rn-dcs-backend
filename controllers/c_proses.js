//generate proses fuzzynya
const db = require('../models');

var dataNR;
var nRendahKehadiran;
var nBaikKehadiran;
var nSangatBaikKehadiran;

var nRendahKerapihan;
var nBaikKerapihan;
var nSangatBaikKerapihan;

var nRendahSikap;
var nBaikSikap;
var nSangatBaikSikap;

var bigData = [];
var nObject = {};
var nKehadiran = [];
var nKerapihan = [];
var nSikap = [];
var nilaiKaryawan;

var zResult;
var aData=[];
var zData=[];
var aNo = 1;
var zNo = 1;

var dataResultDefuzzyfikasi = [];

var getDataByWeek  = (req, res) => {
    return new Promise((resolve, reject) => {
        let data  =  db.penilaian.sequelize.query(
            `SELECT 
            SUM (penilaians.sikap) as "total_sikap", 
            SUM (penilaians.kehadiran) as "total_kehadiran",
            SUM (penilaians.kerapihan) as "total_kerapihan", 
            absens.id, karyawans.nama
            FROM penilaians 
            LEFT JOIN absens on penilaians.id_absen = absens.id
            LEFT JOIN karyawans on absens.id_karyawan = karyawans.id
            where id_absen = penilaians.id_absen and penilaians.tag = '${req.body.week}'
            group by absens.id, karyawans.id
            
            `, {type: db.penilaian.sequelize.QueryTypes.SELECT})
            .then((result) => {
                resolve(data);
                res.status(200).send(result);
            })
            .catch((err) => {
                reject(err);
                res.status(500).send(err);
            });
    })
    
};

var fuzzyNR = (req, res) => {
   
    //output fuzzy
    let nBaik = (aPredikat, id) => {
        var temp;
        temp = 3 * aPredikat;
        zResult = 8 + temp;
        // var temp = 'z'+zNo;
        zData.push({'id': id, 'z': zResult, 'no': zNo ,'status': 'Baik'});
        zNo+=1;
        return zResult;
    }

    let nBuruk = (aPredikat, id) => {
        var temp;
        temp = 2 * aPredikat;
        zResult = 5 + temp;
        zData.push({'id': id, 'z': zResult, 'no': zNo, 'status': 'Buruk'});
        zNo+=1;
        return zResult;
    }

    //defuzzyfikasi the last things using methode weight average

    let defuzzyfikasi = (dataKaryawan, nilaiA, nilaiZ) => {
        for (var i = 0; i<dataKaryawan.length; i++) {
            var atas = 0;
            var bawah = 0;
            for (var a = 0; a<nilaiA.length; a++) {
              var hasilKali = 0;
              var hasilBawah = 0;
              for (var z = 0; z<nilaiZ.length; z++) {
                if (dataKaryawan[i].id === nilaiA[a].id && a === z && nilaiA[a].a !== 0 && nilaiA[a].id === nilaiZ[z].id  && nilaiA[a].no === nilaiZ[z].no) {
                  hasilKali = nilaiA[a].a * nilaiZ[z].z;
                  atas += hasilKali;
                  bawah += nilaiA[a].a;
                }
              }
            }
            var hasil = atas / bawah;
            var keterangan = '';
            if (hasil >5) {
                keterangan = 'baik';
            } else {
                keterangan = 'buruk';
            }
            dataResultDefuzzyfikasi.push({'id': dataKaryawan[i].id, 'nama': dataKaryawan[i].nama, 'nilai_karywan': hasil, 'keterangan': keterangan})
        }
    }

    //end of defuzzifikasi
    

    let rule = (obj) => {
        
        var x = obj;
        
        //kehadiran
        var kh_r = x.kehadiran[0].r;
        var kh_b = x.kehadiran[1].b;
        var kh_sb = x.kehadiran[2].sb;
        var kehadiran = []
        kehadiran.push(kh_r, kh_b, kh_sb);
        
        //kerapihan
        var kr_r = x.kerapihan[0].r;
        var kr_b = x.kerapihan[1].b;
        var kr_sb = x.kerapihan[2].sb;
        var kerapihan = [];
        kerapihan.push(kr_r, kr_b, kr_sb);

        //sikap
        var s_r = x.sikap[0].r;
        var s_b = x.sikap[1].b;
        var s_sb = x.sikap[2].sb;
        var sikap = [];
        sikap.push(s_r, s_b, s_sb);

        let mainRule = (kehadiranParam, kerapihanParam, sikapParam, status, id) => {
            var arr = [];
            arr.push(kehadiranParam, kerapihanParam, sikapParam);
            var min = arr[0];
            var aPredikat;
            for (var i = 0; i<arr.length; i++) {
                if (min > arr[i]) {
                    min = arr[i]
                }
            }
            aPredikat = min;
            // var temp = 'a'+aNo;
            aData.push({'id': id, 'a': aPredikat, 'no': aNo});
            aNo+=1;
            if (status === 'baik') {
                nBaik(aPredikat, id)
            } else if (status === 'buruk') {
                nBuruk(aPredikat, id);
            }
        } 

        // generate nilai aPredikat sesuai 27 rule below!;
        // var ceklloop = 1;
        for (var i = 0; i<kehadiran.length; i++) {
            for (var j = 0; j<kerapihan.length; j++) {
                for (var l = 0; l<sikap.length; l++) {
                    if ((i === 0 && j === 0) || (j === 0 && l === 0) || (l === 0 && i ===0)) {
                        mainRule(kehadiran[i], kerapihan[j], sikap[l], 'buruk', x.id);
                    } else {
                        mainRule(kehadiran[i], kerapihan[j], sikap[l], 'baik', x.id);
                    }
                    // console.log(ceklloop)
                    // ceklloop++;
                }
            }
        }
        aNo = 1;
        zNo = 1;
        
    };


    var week = req.body.week;
    console.log('bodynya  - ', week)
    let fuzzyKehadiran = (nilai_input, id, nama) => {
        console.log('mnasuukkk ',nilai_input)
        var nilai_x = Number(String(Number(nilai_input) / 7).substr(0,4));
        console.log('k - nilai x - : ', nilai_x)
        let nRendah = (x) => {
            if (x < 3) {
                nRendahKehadiran = 1;
            } else if (x >= 3 && x < 5) {
                nRendahKehadiran = ((5 - x) / 2);
            } else if (x >= 5) {
                nRendahKehadiran = 0;
            }
            return nRendahKehadiran;
        }

        let nBaik = (x) => {
            if (x === 6) {
                nBaikKehadiran = 1;
            } else if (x >= 6 && x < 8) {
                nBaikKehadiran = ((6 - x) / 2);
            } else if (x >= 4 && x < 6) {
                nBaikKehadiran = ((x - 4) / 2);
            } else if (x < 4 || x >= 8) {
                nBaikKehadiran = 0;
            }
            return nBaikKehadiran;
        }

        let nSangatBaik = (x) => {
            if (x >= 9) {
                nSangatBaikKehadiran = 1;
            } else if (x >= 7 && x <9) {
                nSangatBaikKehadiran = ((x - 7) / 2);
            } else if (x < 7) {
                nSangatBaikKehadiran = 0;
            }
            return nSangatBaikKehadiran;
        }

        nBaik(nilai_x);
        nRendah(nilai_x);
        nSangatBaik(nilai_x);

        var temp_nKehadiran = {
            'id': id,
            'nama': nama,
            'kehadiran' : [
                { 'r' : nRendahKehadiran }, 
                { 'b' : nBaikKehadiran },
                { 'sb': nSangatBaikKehadiran }
            ]
        };
        // console.log('kehadiran : ', nKehadiran)
        Object.assign(nObject, temp_nKehadiran);
        // console.log(nKehadiran)
        // console.log('k - rendah : ',nRendahKehadiran);
        // console.log('k - baik : ', nBaikKehadiran);
        // console.log('k - sb : ', nSangatBaikKehadiran);
    };

    let fuzzyKerapihan = (nilai_input) => {
        var nilai_x = Number(String(Number(nilai_input) / 7).substr(0,4));
        console.log('Kerapihan - nilai x - : ', nilai_x)
        let nRendah = (x) => {
            if (x < 2) {
                nRendahKerapihan = 1;
            } else if (x >= 2 && x < 3) {
                nRendahKerapihan = ((3 - x) / 1);
            } else if (x >= 3) {
                nRendahKerapihan = 0;
            }
            return nRendahKerapihan;
        }

        let nBaik = (x) => {
            if (x === 3) {
                nBaikKerapihan = 1;
            } else if (x >= 3 && x < 4) {
                nBaikKerapihan = ((3 - x) / 1);
            } else if (x >= 2 && x < 3) {
                nBaikKerapihan = ((x - 2) / 1);
            } else if (x < 2 || x >= 4 ) {
                nBaikKerapihan = 0;
            }
            return nBaikKerapihan;
        }

        let nSangatBaik = (x) => {
            if (x >= 4.5) {
                nSangatBaikKerapihan = 1;
            } else if (x > 3.5 && x < 4.5) {
                nSangatBaikKerapihan = ((x - 3.5) / 1);
            } else if (x <= 3.5) {
                nSangatBaikKerapihan = 0;
            }
            return nSangatBaikKerapihan;
        }
        nBaik(nilai_x);
        nRendah(nilai_x);
        nSangatBaik(nilai_x);

        var temp_nKerapihan = {
            'kerapihan' : [
                { 'r' : nRendahKerapihan }, 
                { 'b' : nBaikKerapihan },
                { 'sb': nSangatBaikKerapihan }
            ]
        };
        // nObject.concath(temp_nKerapihan);
        Object.assign(nObject, temp_nKerapihan)
        // console.log('Kerapihan : ', nKerapihan)

        // console.log('kerapihan - rendah : ',nRendahKerapihan);
        // console.log('kerapihan - baik : ', nBaikKerapihan);
        // console.log('kerapihan - sb : ', nSangatBaikKerapihan);
    };

    let fuzzySikap = (nilai_input) => {
        var nilai_x = Number(String(Number(nilai_input) / 7).substr(0,4));
        console.log('Sikap - nilai x : ', nilai_x)
        let nRendah = (x) => {
            if (x < 2) {
                nRendahSikap = 1;
            } else if (x >= 2 && x < 3) {
                nRendahSikap = ((3 - x) / 1);
            } else if (x >= 3) {
                nRendahSikap = 0;
            }
            return nRendahSikap;
        };

        let nBaik = (x) => {
            if (x === 3) {
                nBaikSikap = 1;
            } else if (x >= 3 && x < 4) {
                nBaikSikap = ((3 - x) / 1);
            } else if (x >= 2 && x < 3) {
                nBaikSikap = ((x - 2) / 1);
            } else if (x < 2 || x >= 4 ) {
                nBaikSikap = 0;
            }
            return nBaikSikap;
        };

        let nSangatBaik = (x) => {
            if (x >= 4.5) {
                nSangatBaikSikap = 1;
            } else if (x > 3.5 && x < 4.5) {
                nSangatBaikSikap = ((x- 3.5) / 1);
            } else if (x <= 3.5) {
                nSangatBaikSikap = 0;
            }
            return nSangatBaikSikap;
        };
        nBaik(nilai_x);
        nRendah(nilai_x);
        nSangatBaik(nilai_x);

        var temp_nSikap = {
            'sikap' : [
                { 'r' : nRendahSikap }, 
                { 'b' : nBaikSikap },
                { 'sb': nSangatBaikSikap }
            ]
        };

        // nObject.push(temp_nSikap);
        Object.assign(nObject, temp_nSikap)
        
        bigData.push(nObject)
        nObject = {}
        // rule()

        // console.log('Sikap - rendah : ',nRendahSikap);
        // console.log('Sikap - baik : ', nBaikSikap);
        // console.log('Sikap - sb : ', nSangatBaikSikap);
    };

    // nObject.push(nKehadiran, nKerapihan, nSikap);
    // console.log('object : ', nObject);
    // console.log('-----', nKehadiran);
    console.log(nRendahSikap)
    

    let getData = (weekParam) => {
        return new Promise((resolve, reject) => {
            let data = db.penilaian.sequelize.query(
                `SELECT 
                    SUM (penilaians.sikap) as "total_sikap", 
                    SUM (penilaians.kehadiran) as "total_kehadiran",
                    SUM (penilaians.kerapihan) as "total_kerapihan", 
                    absens.id, karyawans.nama
                FROM penilaians 
                    LEFT JOIN absens on penilaians.id_absen = absens.id
                    LEFT JOIN karyawans on absens.id_karyawan = karyawans.id
                    where id_absen = penilaians.id_absen and penilaians.tag = '${weekParam}'
                    group by absens.id, karyawans.id
                    
                `, {type: db.penilaian.sequelize.QueryTypes.SELECT});
            resolve(data);
        });
    };

    getData(week)
    .then((result) => {
        result.map(x => {
            fuzzyKehadiran(x.total_kehadiran, x.id, x.nama)
            fuzzyKerapihan(x.total_kerapihan)
            fuzzySikap(x.total_sikap)
            
        })
        // console.log('======================',JSON.stringify(bigData));
        
    })
    .then(() => {
        bigData.map(x => {
            rule(x)
        })

        // console.log('anya : ', aData)
        // console.log('znya : ', zData)
        // console.log('bigdatanya: ', bigData)
        
        defuzzyfikasi(bigData, aData, zData);

        console.log('hasil : ',dataResultDefuzzyfikasi)
    })
    .then(console.log('sukses generate proses fuzzy penilaian!'))
};


module.exports = {
    getDataByWeek,
    fuzzyNR,
}