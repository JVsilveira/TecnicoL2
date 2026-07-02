//A quantidade de horas que cada professor tem comprometido em aulas - Então faça uma consulta SQL que traga essa informação.

SELECT
    p.codprof,
    p.nomeprof,
    SUM(h.numhoras) AS total_horas
FROM professor p
JOIN profturma pt ON p.codprof = pt.codprof
JOIN horario h ON pt.coddepto = h.coddepto
    AND pt.numdisc = h.numdisc
    AND pt.anosem = h.anosem
    AND pt.siglatur = h.siglatur
GROUP BY p.codprof, p.nomeprof;

// Lista de salas com horários livres e ocupados - Pode usar SQL e a linguagem de programação que achar melhor.

SELECT
    s.codpredio,
    s.numsala,
    s.descricaosala,
    s.capacidade,
    CASE
        WHEN h.numsala IS NULL THEN 'Livre'
        ELSE 'Ocupada'
    END AS status_sala
FROM sala s
LEFT JOIN horario h ON s.codpredio = h.codpredio
    AND s.numsala = h.numsala;