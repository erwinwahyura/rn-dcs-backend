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
    var week = req.body.week;
    console.log('bodynya  - ', week)
    let fuzzyKehadiran = (nilai_input) => {
        console.log('mnasuukkk ',nilai_input)
        var nilai_x = Number(String(Number(nilai_input) / 7).substr(0,4));
        console.log('k - nilai x - : ', nilai_x)
        let nRendah = (x) => {
            if (x < 3) {
                nRendahKehadiran = 1;
            } else if (x >= 3 && x < 5) {
                nRendahKehadiran = Number(String(((5 - x) / 2)).substr(0,4));
            } else if (x >= 5) {
                nRendahKehadiran = 0;
            }
        }

        let nBaik = (x) => {
            if (x === 6) {
                nBaikKehadiran = 1;
            } else if (x >= 6 && x < 8) {
                nBaikKehadiran = Number(String(((6 - x) / 2)).substr(0,4));
            } else if (x >= 4 && x < 6) {
                nBaikKehadiran = Number(String(((x - 4) / 2)).substr(0,4));
            } else if (x < 4 || x >= 8) {
                nBaikKehadiran = 0;
            }
        }

        let nSangatBaik = (x) => {
            if (x >= 9) {
                nSangatBaikKehadiran = 1;
            } else if (x >= 7 && x <9) {
                nSangatBaikKehadiran = Number(String(((x - 7) / 2)).substr(0,4));
            } else if (x < 7) {
                nSangatBaikKehadiran = 0;
            }
        }
        nBaik(nilai_x);
        nRendah(nilai_x);
        nSangatBaik(nilai_x);

        console.log('k - rendah : ',nRendahKehadiran);
        console.log('k - baik : ', nBaikKehadiran);
        console.log('k - sb : ', nSangatBaikKehadiran);
    }

    let fuzzyKerapihan = (nilai_input) => {
        var nilai_x = Number(String(Number(nilai_input) / 7).substr(0,4));
        console.log('Kerapihan - nilai x - : ', nilai_x)
        let nRendah = (x) => {
            if (x < 2) {
                nRendahKerapihan = 1;
            } else if (x >= 2 && x < 3) {
                nRendahKerapihan = Number(String(((3 - x) / 1)).substr.apply(0,4));
            } else if (x >= 3) {
                nRendahKerapihan = 0;
            }
        }

        let nBaik = (x) => {
            if (x === 3) {
                nBaikKerapihan = 1;
            } else if (x >= 3 && x < 4) {
                nBaikKerapihan = Number(String(((3 - x) / 1)).substr(0,4));
            } else if (x >= 2 && x < 3) {
                nBaikKerapihan = Number(String(((x - 2) / 1)).substr(0,4));
            } else if (x < 2 || x >= 4 ) {
                nBaikKerapihan = 0;
            }
        }

        let nSangatBaik = (x) => {
            if (x >= 4.5) {
                nSangatBaikKerapihan = 1;
            } else if (x > 3.5 && x < 4.5) {
                nSangatBaikKerapihan = Number(String(((x - 3.5) / 1)).substr(0,4));
            } else if (x <= 3.5) {
                nSangatBaikKerapihan = 0;
            }
        }
        nBaik(nilai_x);
        nRendah(nilai_x);
        nSangatBaik(nilai_x);

        console.log('kerapihan - rendah : ',nRendahKerapihan);
        console.log('kerapihan - baik : ', nBaikKerapihan);
        console.log('kerapihan - sb : ', nSangatBaikKerapihan);
    }

    let fuzzySikap = (nilai_input) => {
        var nilai_x = Number(String(Number(nilai_input) / 7).substr(0,4));
        console.log('Sikap - nilai x : ', nilai_x)
        let nRendah = (x) => {
            if (x < 2) {
                nRendahSikap = 1;
            } else if (x >= 2 && x < 3) {
                nRendahSikap = Number(String(((3 - x) / 1)).substr(0,4));
            } else if (x >= 3) {
                nRendahSikap = 0;
            }
        };

        let nBaik = (x) => {
            if (x === 3) {
                nBaikSikap = 1;
            } else if (x >= 3 && x < 4) {
                nBaikSikap = Number(String(((3 - x) / 1)).substr(0,4));
            } else if (x >= 2 && x < 3) {
                nBaikSikap = Number(String(((x - 2) / 1)).substr(0,4));
            } else if (x < 2 || x >= 4 ) {
                nBaikSikap = 0;
            }
        };

        let nSangatBaik = (x) => {
            if (x >= 4.5) {
                nSangatBaikSikap = 1;
            } else if (x > 3.5 && x < 4.5) {
                nSangatBaikSikap = Number(String(((x- 3.5) / 1)).substr(0,4));
            } else if (x <= 3.5) {
                nSangatBaikSikap = 0;
            }
        };
        nBaik(nilai_x);
        nRendah(nilai_x);
        nSangatBaik(nilai_x);

        console.log('Sikap - rendah : ',nRendahSikap);
        console.log('Sikap - baik : ', nBaikSikap);
        console.log('Sikap - sb : ', nSangatBaikSikap);
    };

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
        // console.log('get datanyaa a ',result)
        result.map(x => {
            fuzzyKehadiran(x.total_kehadiran)
            fuzzyKerapihan(x.total_kerapihan)
            fuzzySikap(x.total_sikap)
        })
        // fuzzyKehadiran(result[0].total_kehadiran);
    })
};


module.exports = {
    getDataByWeek,
    fuzzyNR,
}