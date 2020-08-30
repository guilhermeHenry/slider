<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<title>Layout 1</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="../../oocss/style.min.css">	
	<link rel="stylesheet" type="text/css" href="css/layout1.css">
</head>
<body>
	<?php
		$factory = require '../src/factory/factory.php';
	?>
	<div class="slider">
		<div class="content">
			
			<div class="item">
				<div class="block stamp">
					<?php
					$i = 1;
					foreach ($factory as $value):
						extract($value);
						if ($i <= 1 ):
							?>
							<article>
								<hr style="--bg: url('<?= '../' . $background['path'] . '/' . $background['img'] ?>'); --bg-x: <?= $background['x'] ?>; --bg-y: <?= $background['y'] ?>;">
								<header>
									<span>Por <strong>Guilherme Henrique</strong></span>
									<strong>- há 1 hora atraz</strong>
								</header>
								<h1><?= $title ?></h1>
								<p><?= substr($subtitle, 0, 190) . '...' ?></p>
							</article>
							<?php
							$i++;
						endif;
					endforeach;
					?>
				</div>


				<div class="block line">
					<?php
					$i = 1;
					foreach ($factory as $value):
						extract($value);
						if ($i > 1 && $i <= 4):
							?>
							<article>
								<hr style="--bg: url('<?= '../' . $background['path'] . '/' . $background['img'] ?>'); --bg-x: <?= $background['x'] ?>; --bg-y: <?= $background['y'] ?>;">
								<div class="right">
									<header>
										<span>Por <strong>Guilherme Henrique</strong></span>
										<strong>- há 1 hora atraz</strong>
									</header>
									<h1><?= $title ?></h1>
									<p><?= substr($subtitle, 0, 100) . '...' ?></p>
								</div>
							</article>
							<?php
						endif;
						$i++;
					endforeach;
					?>
				</div>


			</div>

		</div>
	</div>
</body>
</html>