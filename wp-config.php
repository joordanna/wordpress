<?php
/**
 * As configurações básicas do WordPress
 *
 * O script de criação wp-config.php usa esse arquivo durante a instalação.
 * Você não precisa usar o site, você pode copiar este arquivo
 * para "wp-config.php" e preencher os valores.
 *
 * Este arquivo contém as seguintes configurações:
 *
 * * Configurações do banco de dados
 * * Chaves secretas
 * * Prefixo do banco de dados
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Configurações do banco de dados - Você pode pegar estas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define( 'DB_NAME', 'woocommerce_db' );

/** Usuário do banco de dados MySQL */
define( 'DB_USER', 'root' );

/** Senha do banco de dados MySQL */
define( 'DB_PASSWORD', '' );

/** Nome do host do MySQL */
define( 'DB_HOST', 'localhost' );

/** Charset do banco de dados a ser usado na criação das tabelas. */
define( 'DB_CHARSET', 'utf8mb4' );

/** O tipo de Collate do banco de dados. Não altere isso se tiver dúvidas. */
define( 'DB_COLLATE', '' );

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las
 * usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org
 * secret-key service}
 * Você pode alterá-las a qualquer momento para invalidar quaisquer
 * cookies existentes. Isto irá forçar todos os
 * usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '>m!S:5UisR5CqSWJ}qoK,Wc@z/pY:B*X8.?u;[SNk9@ +{vk[],gIdg!]al5F)B?' );
define( 'SECURE_AUTH_KEY',  'CfmY}064.-H+?rtw_,(|/[_lF!h7X]f6yhkK*b/@0?$oCr<-/BW UUPXp(6L|BT$' );
define( 'LOGGED_IN_KEY',    ';(=7;PakC7^p Y-H;d<i$`A uz(q>A}37:{3qFsFNI%U)# %Pb[_&m]V)amzCZM:' );
define( 'NONCE_KEY',        'vC0lGWn]BP$2+g#HsM Cnp7v5}9#0&m]^tHykZd]A*XmL;!zme[m<%o1PWvw.Yb=' );
define( 'AUTH_SALT',        'uEKF)H*VjAlCz|v?24!jr/_oZo.HX^Bq/.X($zm[-+L+M#,`?YTOBmxyVUCIq9rw' );
define( 'SECURE_AUTH_SALT', 'om `r>ymwzZPvT)k#84O;R5Fo$(7LGrY*(P}+pAvaKO${vw5`Z|y[!;:gY-(Jl(0' );
define( 'LOGGED_IN_SALT',   '@n?Jt]jxf=W=1+-pLOh;[1ABiqN!(E~loN]RTVM)_,}YJ-.W`,5F|GeO]dAp10iT' );
define( 'NONCE_SALT',       '-2!]DWCUuJ@T}r  v4g*gH>yn!}=r$A<<KU)?_D!}KxDKW2uZ#6,6Jz+?04s4ti?' );

/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der
 * um prefixo único para cada um. Somente números, letras e sublinhados!
 */
$table_prefix = 'wp_';

/**
 * Para desenvolvedores: Modo de debug do WordPress.
 *
 * Altere isto para true para ativar a exibição de avisos
 * durante o desenvolvimento. É altamente recomendável que os
 * desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 *
 * Para informações sobre outras constantes que podem ser utilizadas
 * para depuração, visite o Codex.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Adicione valores personalizados entre esta linha até "Isto é tudo". */



/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Configura as variáveis e arquivos do WordPress. */
require_once ABSPATH . 'wp-settings.php';
