<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'amarquez' );

/** Database username */
define( 'DB_USER', 'amarquez' );

/** Database password */
define( 'DB_PASSWORD', '<cBDPhp2024' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ' dT&Z8p#v[$c-pmhBb)prhYgG6<NUH/1-ic1..%F:81m/Tvx i1`tCp6edPfP+>Z' );
define( 'SECURE_AUTH_KEY',  ';Lr5k1|`c+.nA_TN5&+%#^Hc(]oY;#O:M0B/+Ayo2ZCqTJ-@^R.t;A;n-2OC,d4^' );
define( 'LOGGED_IN_KEY',    'fO0nbCB(?C%>xkmB%yt;Y_Vr~BlqV/]R`kN8G-#~{Od3NzQ_x2-{x{d>N_fsJBO-' );
define( 'NONCE_KEY',        'Q;ils=PpnjE.pY|&B=g6<{ck`Yju4dbPlwG 0-`M-k5flaO|zv6JM,rF2*n?# *^' );
define( 'AUTH_SALT',        '#n`7y8^HibVLA8h/<$oxe<tc=p_ZKt5Q9,(*p.n7)so2oiMO}@,O&]Ik8pzaTq~)' );
define( 'SECURE_AUTH_SALT', 'PzS06u$GP>`WF.jS<p~OPigYA80Lg_S3G%O.&(8`Sl}t&36^(>e=LPWq(i_u2x#5' );
define( 'LOGGED_IN_SALT',   '2UKvx!0mj1VV|q?Go0a{a.uG0^wg}`4fMVnk;fG12 n`Xp^O)iB$>y+5<Xj6!wgv' );
define( 'NONCE_SALT',       'u)xamQW[TR:#vl2iNgw.OBQK9X(isiCF{7p,d/)Q.)Wb}KHEm,zWuSz{ZIhR/ZxJ' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'pf_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
