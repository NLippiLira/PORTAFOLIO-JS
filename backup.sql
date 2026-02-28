--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_id_seq OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: bibliographies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bibliographies (
    id integer NOT NULL,
    title character varying(150) NOT NULL,
    author character varying(100),
    year character varying(10),
    url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bibliographies OWNER TO postgres;

--
-- Name: bibliographies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bibliographies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bibliographies_id_seq OWNER TO postgres;

--
-- Name: bibliographies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bibliographies_id_seq OWNED BY public.bibliographies.id;


--
-- Name: biographies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.biographies (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.biographies OWNER TO postgres;

--
-- Name: biographies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.biographies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.biographies_id_seq OWNER TO postgres;

--
-- Name: biographies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.biographies_id_seq OWNED BY public.biographies.id;


--
-- Name: contact_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_messages (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.contact_messages OWNER TO postgres;

--
-- Name: contact_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_messages_id_seq OWNER TO postgres;

--
-- Name: contact_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_messages_id_seq OWNED BY public.contact_messages.id;


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contacts_id_seq OWNER TO postgres;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: cvs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cvs (
    id integer NOT NULL,
    filename character varying(255) NOT NULL,
    originalname character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cvs OWNER TO postgres;

--
-- Name: cvs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cvs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cvs_id_seq OWNER TO postgres;

--
-- Name: cvs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cvs_id_seq OWNED BY public.cvs.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    description text NOT NULL,
    github_url text,
    demo_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: bibliographies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bibliographies ALTER COLUMN id SET DEFAULT nextval('public.bibliographies_id_seq'::regclass);


--
-- Name: biographies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.biographies ALTER COLUMN id SET DEFAULT nextval('public.biographies_id_seq'::regclass);


--
-- Name: contact_messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_messages ALTER COLUMN id SET DEFAULT nextval('public.contact_messages_id_seq'::regclass);


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: cvs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cvs ALTER COLUMN id SET DEFAULT nextval('public.cvs_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, username, password, created_at) FROM stdin;
1	admin	$2b$10$xBZ55M7KLVDt8AA880xPxu6N82Km97rArrbFdoUjQXJI/OiV1Npdy	2026-01-31 04:16:27.349785
\.


--
-- Data for Name: bibliographies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bibliographies (id, title, author, year, url, created_at) FROM stdin;
3	AI Strategies for Web Development	Anderson Soares Furtado Oliveira	2024	https://www.oreilly.com/library/view/ai-strategies-for/9781835886304/	2026-02-26 01:01:47.561367
4	Artificial Intelligence: A Modern Approach	Stuart J. Russell & Peter Norvig	2020	https://aima.cs.berkeley.edu/	2026-02-26 01:03:37.654036
5	 Designing with Web Standards	 Jeffrey Zeldman (con Ethan Marcotte en ediciones recientes)	2009	 https://en.wikipedia.org/wiki/Designing_with_Web_Standards	2026-02-26 01:04:21.363424
6	 Hello World: How to Be Human in the Age of the Machine	 Hannah Fry	2018	https://en.wikipedia.org/wiki/Hello_World%3A_How_to_be_Human_in_the_Age_of_the_Machine	2026-02-26 01:04:54.272012
7	AI Snake Oil: What Artificial Intelligence Can Do, What It Can’t	Arvind Narayanan & Sayash Kapoor	2024	https://en.wikipedia.org/wiki/AI_Snake_Oil	2026-02-26 01:05:36.73494
\.


--
-- Data for Name: biographies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.biographies (id, title, content, created_at) FROM stdin;
1	Nicolás 	si no si	2026-02-20 18:31:02.022212
2	Nicolás A. Lippi L 	Soy desarrollador Full Stack JavaScript con formación en tecnologías web modernas y enfoque en crear aplicaciones funcionales, escalables y con una excelente experiencia de usuario.\r\n\r\nDurante mi formación y proyectos personales he trabajado con HTML, CSS, JavaScript, Node.js y bases de datos, aplicando buenas prácticas, control de versiones y diseño responsive.\r\n\r\nMe motiva resolver problemas reales, aprender continuamente y participar en proyectos donde la tecnología tenga impacto directo en las personas o en procesos productivos.\r\n\r\n	2026-02-20 18:32:17.480489
\.


--
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_messages (id, name, email, message, created_at) FROM stdin;
1	Nicolas	nlippilira@gmail.com	puedes llamarme o no ?	2026-02-01 00:39:10.108242
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (id, name, email, message, is_read, created_at) FROM stdin;
1	Nicolas	nlippilira@gmail.com	hola	t	2026-02-17 16:56:47.85869
3	Lippi Lira	nlippilira@gmail.com	contactame porfavor	t	2026-02-25 23:22:56.394759
4	Nicolas	nlippilira@gmail.com	sdssfs	t	2026-02-26 00:10:36.789292
5	Nicolas	nlippilira@gmail.com	ahora si akjsakjs	t	2026-02-26 00:20:42.659224
\.


--
-- Data for Name: cvs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cvs (id, filename, originalname, created_at) FROM stdin;
6	cv.pdf	NicolÃ¡s Alberto Lippi Lira TI Act.pdf	2026-02-17 19:36:46.189467
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, title, description, github_url, demo_url, created_at) FROM stdin;
2	Mi primer portafolio	Portafolio web estático para presentar mis proyectos, habilidades y experiencia como Desarrollador Full Stack JavaScript. HTML, CSS, JS, Bootstrap.	https://github.com/NLippiLira/mi-portafolio	https://nlippilira.github.io/mi-portafolio/	2026-02-26 01:09:04.707077
3	TaskFlow	Usuario que necesita organizar tareas/proyectos personales o laborales de forma clara y rápida. HTML, CSS, JS, Postgres, Bootstrap	https://github.com/NLippiLira/taskflow	https://nlippilira.github.io/taskflow/	2026-02-26 01:10:58.211636
4	WeatherFlow	Dashboard Interactivo de Clima + Favoritos, funciona mediante API consulta web en tiempo real. HTML, CSS, JS, Bootstrap.	https://github.com/NLippiLira/weatherflow	https://nlippilira.github.io/weatherflow/	2026-02-26 01:12:46.421585
5	SmartBoard	SmartBoard es una aplicación web que funciona como un tablero inteligente de notas. CRUD, HTML, CSS, JS, Bootstrap, Postgres	https://github.com/NLippiLira/smartboard	https://nlippilira.github.io/smartboard/	2026-02-26 01:14:12.234815
6	Portfolio Django	Portfolio with other stack, Django. HTML, JS, Python, CSS	https://github.com/NLippiLira/PORTAFOLIO-DJ	https://portafolio-dj.onrender.com/	2026-02-26 01:17:38.45137
7	OUTIN-APP	My first e-commerce website with Django, Python, JS, CSS, HTML.	https://github.com/NLippiLira/outin	https://outin.onrender.com/	2026-02-26 01:19:09.09654
\.


--
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 1, true);


--
-- Name: bibliographies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bibliographies_id_seq', 7, true);


--
-- Name: biographies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.biographies_id_seq', 2, true);


--
-- Name: contact_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_messages_id_seq', 1, true);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 5, true);


--
-- Name: cvs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cvs_id_seq', 6, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 7, true);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: admins admins_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);


--
-- Name: bibliographies bibliographies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bibliographies
    ADD CONSTRAINT bibliographies_pkey PRIMARY KEY (id);


--
-- Name: biographies biographies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.biographies
    ADD CONSTRAINT biographies_pkey PRIMARY KEY (id);


--
-- Name: contact_messages contact_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_messages
    ADD CONSTRAINT contact_messages_pkey PRIMARY KEY (id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: cvs cvs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cvs
    ADD CONSTRAINT cvs_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

