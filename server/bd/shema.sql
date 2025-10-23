--creacion de la tabla clientes
create table if not exists clientes (
   id_cliente    integer primary key, -- Change is here
   nombre        text not null,
   rut           text,
   correo        text not null unique,
   password_hash text not null,
   created_at    text not null default ( datetime('now') )
);