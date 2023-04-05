CREATE TABLE public."book"
(
    id serial NOT NULL,
    title character varying(25) NOT NULL,
    author_id INT NOT NULL,
    publisher VARCHAR(50) NOT NULL,
    isbn VARCHAR(15) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES author(id)
    
);



CREATE TABLE public.author (
    id serial NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);
select * from author
insert into author (first_name, last_name, dob ) values
('Jk', 'Rowling', '1964-05-12'), 
('Laurent', 'Richard', '1955-03-15'),  
('Trevor', 'Noah', '1985-02-12'),
('Sue', 'Watson', '1944-11-14'), 
('Frank', 'Hebert', '1974-11-05');

select * from book
insert into book (title, author_id, publisher, isbn) values
('BornACrime', 2, 'InkyardPress', '11a'),
('Dune', 3, 'Olympia', '12a'),
('Pegasus', 4, 'SimonSchuster', '13a'),
('GoodnightMoon', 5, 'Olympia', '14a');

