<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title></title>
</head>

<body>


    <table id="total_farm_per_user" style="border-collapse: collapse; width: 70%;">
        <thead>
            <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Total Farms</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"></th>
            </tr>
        </thead>
        <tbody>
            @foreach ($report_generation['total_farm_per_user'] as $total_farm_per_user)
                <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_farm_per_user->name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_farm_per_user->total_farms }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    
</body>

</html>
