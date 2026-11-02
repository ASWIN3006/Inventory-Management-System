DROP DATABASE IF EXISTS materialdb;
CREATE DATABASE materialdb;
USE materialdb;

-- =========================
-- MATERIAL CATEGORY TABLE
-- =========================
DROP TABLE IF EXISTS material_category;

CREATE TABLE material_category (
    category_id VARCHAR(255) NOT NULL,
    category_name VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO material_category (category_id, category_name) VALUES
('C001', 'Thread'),
('C002', 'Cloth'),
('C003', 'Button');

COMMIT;

-- =========================
-- MATERIAL TYPE TABLE
-- =========================
DROP TABLE IF EXISTS material_type;

CREATE TABLE material_type (
    type_id VARCHAR(255) NOT NULL,
    type_name VARCHAR(255) DEFAULT NULL,
    category_id VARCHAR(255) DEFAULT NULL,

    PRIMARY KEY (type_id),
    KEY idx_material_type_category_id (category_id),

    CONSTRAINT fk_material_type_category
        FOREIGN KEY (category_id)
        REFERENCES material_category (category_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO material_type (type_id, type_name, category_id) VALUES
('T001','Silk','C001'),
('T002','Silk','C002'),
('T003','Linen','C001'),
('T004','Linen','C002'),
('T005','Silk Cotton','C003'),
('T006','Suit','C003'),
('T007','Silk Cotton','C002');

COMMIT;

-- =========================
-- UNIT TABLE
-- =========================
DROP TABLE IF EXISTS unit;

CREATE TABLE unit (
    unit_id VARCHAR(255) NOT NULL,
    unit_name VARCHAR(255) DEFAULT NULL,
    category_id VARCHAR(255) DEFAULT NULL,

    PRIMARY KEY (unit_id),
    KEY idx_unit_category_id (category_id),

    CONSTRAINT fk_unit_category
        FOREIGN KEY (category_id)
        REFERENCES material_category (category_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO unit (unit_id, unit_name, category_id) VALUES
('U001','Metres','C001'),
('U002','Metres','C002'),
('U003','Yards','C001'),
('U004','Yards','C002'),
('U005','Kilograms','C003');

COMMIT;