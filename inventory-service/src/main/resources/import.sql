
DROP DATABASE IF EXISTS dbpurchase;
CREATE DATABASE dbpurchase;
USE dbpurchase;

DROP TABLE IF EXISTS purchase;
CREATE TABLE IF NOT EXISTS purchase (
  purchase_id int(11) unsigned NOT NULL AUTO_INCREMENT,
  brandname varchar(255) DEFAULT NULL,
  material_category_id varchar(255) DEFAULT NULL,
  material_type_id varchar(255) DEFAULT NULL,
  purchase_amount double DEFAULT NULL,
  purchase_date date DEFAULT NULL,
  quantity int(11) DEFAULT NULL,
  status varchar(255) DEFAULT NULL,
  transaction_id varchar(255) DEFAULT NULL,
  unit_id varchar(255) DEFAULT NULL,
  vendor_name varchar(255) DEFAULT NULL,
  PRIMARY KEY  (purchase_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO purchase (purchase_id, brandname, material_category_id, material_type_id, purchase_amount, purchase_date, quantity, status, transaction_id, unit_id, vendor_name) VALUES
	(1, 'Kanchi', 'C001', 'T001', 400, '2020-05-17', 4, 'Pending', 'P_ONL_05172020_THR_1', 'U001', 'Only Vimal'),
	(2, 'Raymonds', 'C001', 'T003', 20000, '2019-01-04', 100, 'Pending', 'P_ONL_01042019_THR_2', 'U003', 'Only Vimal'),
	(3, 'Raymonds', 'C003', 'T005', 400, '2020-03-26', 4, 'Pending', 'P_PRR_03262020_BUT_3', 'U005', 'PRR Enterprises'),
	(4, 'Raymonds', 'C002', 'T007', 10000, '2020-02-12', 20, 'Pending', 'P_SRS_02122020_CLO_4', 'U002', 'SRS Enterprises'),
	(5, 'SM Silks', 'C001', 'T001', 32000, '2019-08-16', 32, 'Pending', 'P_SRS_08162019_THR_5', 'U001', 'SRS Enterprises'),
	(6, 'Raymonds', 'C001', 'T003', 3000, '2019-11-01', 30, 'Pending', 'P_PRR_11012019_THR_6', 'U003', 'PRR Enterprises'),
	(7, 'Raymonds', 'C003', 'T006', 1230, '2018-09-15', 10, 'Pending', 'P_SKR_09152018_BUT_7', 'U005', 'SKR Traders'),
	(8, 'Otto', 'C003', 'T006', 549, '2019-07-16', 5, 'Pending', 'P_SKR_07162019_BUT_8', 'U005', 'SKR Traders'),
	(9, 'Akshaya Tex', 'C001', 'T001', 7899, '2019-04-23', 50, 'Pending', 'P_PRR_04232019_THR_9', 'U001', 'PRR Enterprises'),
	(10, 'Raymonds', 'C002', 'T007', 4000, '2019-07-23', 10, 'Pending', 'P_MIN_07232019_CLO_10', 'U002', 'Mind Tree Textiles');

commit;


